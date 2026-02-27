'use client';

import * as React from 'react';
import {
  Twitter,
  Linkedin,
  Facebook,
  Link as LinkIcon,
  MessageCircle,
  Mail,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Button } from './button';
import { cn } from '@/lib/utils/cn';

interface ShareButtonProps {
  url?: string;
  title?: string;
  text?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const sharePlatforms = [
  {
    name: 'Twitter',
    icon: Twitter,
    color: 'text-blue-500 hover:text-blue-600',
    getUrl: (url: string, title: string, text: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
        `${title} - ${text}`
      )}`,
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'text-blue-700 hover:text-blue-800',
    getUrl: (url: string, title: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    name: 'Facebook',
    icon: Facebook,
    color: 'text-blue-600 hover:text-blue-700',
    getUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    color: 'text-green-500 hover:text-green-600',
    getUrl: (url: string, title: string, text: string) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} - ${text} ${url}`)}`,
  },
  {
    name: 'Email',
    icon: Mail,
    color: 'text-gray-600 hover:text-gray-700',
    getUrl: (url: string, title: string, text: string) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
        `${text}\n\n${url}`
      )}`,
  },
];

export function ShareButton({
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = 'Check this out!',
  text = 'I found this interesting',
  className,
  variant = 'outline',
  size = 'default',
}: ShareButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (platform: typeof sharePlatforms[0]) => {
    const shareUrl = platform.getUrl(url, title, text);
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={cn('gap-2', className)}>
          <LinkIcon className="h-4 w-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg p-2 z-50">
        {sharePlatforms.map((platform) => (
          <DropdownMenuItem
            key={platform.name}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
            onClick={() => handleShare(platform)}
          >
            <platform.icon className={cn('h-4 w-4', platform.color)} />
            <span className="text-sm">{platform.name}</span>
          </DropdownMenuItem>
        ))}
        <div className="border-t border-gray-200 dark:border-gray-800 my-2" />
        <DropdownMenuItem
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
          onClick={handleCopyLink}
        >
          <LinkIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm">{copied ? 'Copied!' : 'Copy link'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}