'use client';

import { LogOut, User } from 'lucide-react';

import { useCurrentUser } from '../hooks/use-current-user';

import { cn } from '@/lib/utils';

import LogOutButton from './logout-button';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className={cn('relative rounded-full')}>
          <Avatar>
            <AvatarImage src={user?.image || ''} alt={user?.name || ''} />
            <AvatarFallback className="bg-red-500">
              <User className="text-white" />
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4">
        <DropdownMenuItem>
          <span>{user?.email}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogOutButton>
          <DropdownMenuItem>
            <LogOut className="size-4 mr-2" />
            LogOut
          </DropdownMenuItem>
        </LogOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
