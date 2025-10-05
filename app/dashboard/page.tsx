import Image from 'next/image';

import ProjectTable from '@/features/dashboard/components/project-table';
import AddNewButton from '@/features/dashboard/components/add-new-button';
import AddRepoButton from '@/features/dashboard/components/add-repo-button';
import {
  deleteProjectById,
  duplicateProjectById,
  editProjectById,
  getAllPlaygroundsForUser,
} from '@/features/dashboard/actions';

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';

export default async function Page() {
  const playgrounds = await getAllPlaygroundsForUser();

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
          </Empty>
        ) : (
          <ProjectTable
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            // TODO UPDATE TYPES OF PLAYGROUNDS
            projects={playgrounds || []}
            onDeleteProject={deleteProjectById}
            onUpdateProject={editProjectById}
            onDuplicateProject={duplicateProjectById}
          />
        )}
      </div>
    </div>
  );
}
