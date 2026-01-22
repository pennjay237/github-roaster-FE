import { Globe, MapPin, Briefcase, Mail, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GitHubData } from '@/lib/types/github.types';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';

interface UserAvatarProps {
  user: GitHubData;
  className?: string;
}

export function UserAvatar({ user, className }: UserAvatarProps) {
  return (
    <Card className={cn('border-blue-200 dark:border-blue-800', className)}>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-lg">
             <Image
               src={user.avatarUrl || `https://github.com/${user.username}.png`}
               alt={user.username}
               width={96}
               height={96}
               className="object-cover w-full h-full"
               unoptimized={true} 
            />
            </div>
            <div className="absolute -bottom-2 -right-2">
              <Badge variant="default" className="bg-gradient-to-r from-blue-500 to-purple-500">
                @{user.username}
              </Badge>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            {user.name && (
              <h3 className="text-2xl font-bold mb-1">{user.name}</h3>
            )}
            
            {user.bio && (
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {user.bio}
              </p>
            )}

            {/* Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {user.location && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              )}
              
              {user.company && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Briefcase className="h-4 w-4" />
                  <span>{user.company}</span>
                </div>
              )}
              
              {user.email && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
              )}
              
              {user.blog && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <LinkIcon className="h-4 w-4" />
                  <span className="truncate">{user.blog}</span>
                </div>
              )}
            </div>

            {/* GitHub Profile Link */}
            <a
              href={user.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="gap-2 w-full sm:w-auto">
                <Globe className="h-4 w-4" />
                View GitHub Profile
              </Button>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}