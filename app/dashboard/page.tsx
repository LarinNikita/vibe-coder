import Image from 'next/image';
import { Plus } from 'lucide-react';

import AddNewButton from '@/features/dashboard/components/add-new-button';
import AddRepoButton from '@/features/dashboard/components/add-repo-button';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';

export default function Page() {
  const playgrounds: any[] = [];

  return (
    <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <AddNewButton />
        <AddRepoButton />
      </div>
      <div className="mt-10 flex-col flex justify-center items-center w-full">
        {playgrounds && playgrounds.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <Image
                src={'/empty-state.svg'}
                alt="Empty"
                width={90}
                height={90}
                className="size-48"
              />
            </EmptyHeader>
            <EmptyTitle>No projects found</EmptyTitle>
            <EmptyDescription>
              Create a new project to get started
            </EmptyDescription>
            <EmptyContent>
              <Button>
                <Plus className="size-4" />
                Create a new project
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          // TODO add playground table
          <p>No Playgrounds</p>
        )}
      </div>
    </div>
  );
}
