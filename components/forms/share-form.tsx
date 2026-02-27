'use client';

import { useState } from 'react';
import { Copy, Check, Twitter, Linkedin, MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils/cn';
import toast from 'react-hot-toast';

interface ShareFormProps {
  roast: string;
  username: string;
  className?: string;
}

export function ShareForm({ roast, username, className }: ShareFormProps) {
  const [copied, setCopied] = useState(false);
  const [customMessage, setCustomMessage] = useState(
    `Check out this hilarious roast of ${username}'s GitHub profile! 🔥`
  );

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `${customMessage}\n\n${roast.substring(0, 100)}...\n\n${shareUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleShare = (platform: string) => {
    let url = '';
    
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent(`Roast of ${username}'s GitHub`)}&body=${encodeURIComponent(shareText)}`;
        break;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className={cn('border-orange-200 dark:border-orange-800', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Share this Roast
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Custom Message */}
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Custom Message
          </label>
          <Input
            id="message"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Add a custom message..."
            className="font-mono text-sm"
          />
        </div>

        {/* Share Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            variant="outline"
            onClick={() => handleShare('twitter')}
            className="flex flex-col items-center justify-center h-20 gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            <Twitter className="h-6 w-6 text-blue-500" />
            <span className="text-xs">Twitter</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => handleShare('linkedin')}
            className="flex flex-col items-center justify-center h-20 gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            <Linkedin className="h-6 w-6 text-blue-700" />
            <span className="text-xs">LinkedIn</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => handleShare('whatsapp')}
            className="flex flex-col items-center justify-center h-20 gap-2 hover:bg-green-50 dark:hover:bg-green-900/20"
          >
            <MessageCircle className="h-6 w-6 text-green-500" />
            <span className="text-xs">WhatsApp</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => handleShare('email')}
            className="flex flex-col items-center justify-center h-20 gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Mail className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            <span className="text-xs">Email</span>
          </Button>
        </div>

        {/* Copy Link */}
        <div className="flex gap-2">
          <Input
            value={shareUrl}
            readOnly
            className="flex-1 font-mono text-sm"
          />
          <Button
            onClick={handleCopy}
            variant="outline"
            className="gap-2 min-w-[100px]"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </div>

        {/* Share Stats */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Share with fellow developers for a good laugh! 😄
        </div>
      </CardContent>
    </Card>
  );
}