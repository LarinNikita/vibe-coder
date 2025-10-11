/* eslint-disable @typescript-eslint/no-unsafe-function-type */
'use client';

import { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { format } from 'date-fns';
import {
  Copy,
  Download,
  Edit3,
  ExternalLink,
  Eye,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';

import { Project } from '../types';

import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ProjectTableProps {
  projects: Project[];
  onUpdateProject?: Function;
  onDeleteProject?: Function;
  onDuplicateProject?: Function;
}

interface EditProjectData {
  title: string;
  description: string;
}

export default function ProjectTable({
  projects,
  onUpdateProject,
  onDeleteProject,
  onDuplicateProject,
}: ProjectTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editData, setEditData] = useState<EditProjectData>({
    title: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  // const [favoutrie, setFavourite] = useState(false);

  const handleDuplicateProject = async (project: Project) => {
    if (!onDuplicateProject) return;

    setIsLoading(true);
    try {
      await onDuplicateProject(project.id);
      toast.success('Project duplicated successfully');
    } catch (error) {
      toast.error('Failed to duplicate project');
      console.error('Error duplicating project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (project: Project) => {
    setSelectedProject(project);
    setDeleteDialogOpen(true);
  };

  const handleDeleteProject = async () => {
    if (!selectedProject || !onDeleteProject) return;
    setIsLoading(true);

    try {
      await onDeleteProject(selectedProject.id);
      setDeleteDialogOpen(false);
      setSelectedProject(null);
      toast.success('Project deleted successfully');
    } catch (error) {
      toast.error('Failed to delete project');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (project: Project) => {
    setSelectedProject(project);
    setEditData({
      title: project.title,
      description: project.description || '',
    });

    setEditDialogOpen(true);
  };

  const handleUpdateProject = async () => {
    if (!selectedProject || !onUpdateProject) return;

    setIsLoading(true);
    try {
      await onUpdateProject(selectedProject.id, editData);
      setEditDialogOpen(false);
      setSelectedProject(null);
      toast.success('Project updated successfully');
    } catch (error) {
      toast.error('Failed to update project');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyProjectUrl = (projectId: string) => {
    const url = `${window.location.origin}/playground/${projectId}`;
    navigator.clipboard.writeText(url);
    toast.success('Project URL copied to clipboard');
  };

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Template</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <Link
                      href={`/playground/${project.id}`}
                      className="hover:underline"
                    >
                      <span className="font-semibold">{project.title}</span>
                    </Link>
                    <span className="text-sm text-gray-500 line-clamp-1">
                      {project.description}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-[#e93f3f15] text-[#e93f3f] border-[#e93f3f]"
                  >
                    {project.template}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(project.createdAt), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full overflow-hidden">
                      <Image
                        src={project.user.image || ''}
                        alt={project.user.name}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm">{project.user.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        {/* <MarkedToggleButton
                          markedForRevision={project.starMark[0]?.isMarked}
                          id={project.id}
                        /> */}
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/playground/${project.id}`}
                          className="flex items-center"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Open Project
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/playground/${project.id}`}
                          target="_blank"
                          className="flex items-center"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open in New Tab
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleEditClick(project)}
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDuplicateProject(project)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => copyProjectUrl(project.id)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Copy URL
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(project)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Make changes to your project here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Project title</Label>
              <Input
                id="title"
                value={editData.title}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter project title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editData.description}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter project description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="brand"
              disabled={isLoading}
              onClick={handleUpdateProject}
            >
              {isLoading ? 'Saving...' : 'Save changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;
              <span className="font-semibold text-[#e93f3f]">
                {selectedProject?.title}
              </span>
              &quot;? This action cannot be undone. All files and data
              associated with this project will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProject}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? 'Deleting...' : 'Delete Project'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
