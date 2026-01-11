'use client';

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from '@/components/ui/button';

export default function Home() {
    const projects = useQuery(api.projects.get);
    const createProject = useMutation(api.projects.create);

    console.log("Tobi: Home -> projects", projects)
    return (
        <div className='flex flex-col gap-2 p-4'>
            <Button onClick={() => createProject({
                name: "New Project"
            })}>
                Add new
            </Button>

            {
                projects?.map((project) => (
                    <div
                        key={project._id}
                        className='border rounded p-2 flex flex-col'
                    >
                        <p>{project.name}</p>
                        <p>Owner Id: {`${project.ownerId}`}</p>
                    </div>
                ))
            }
        </div>

    );
}
