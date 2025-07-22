import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export default function BucketGrid() {
  const mockBuckets = [
    { id: 1, name: 'Work Projects', emoji: '💼', taskCount: 8 },
    { id: 2, name: 'Personal', emoji: '🏠', taskCount: 3 },
    { id: 3, name: 'Learning', emoji: '📚', taskCount: 5 },
    { id: 4, name: 'Health & Fitness', emoji: '💪', taskCount: 2 },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Buckets</h2>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Bucket
        </Button>
      </div>
      
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto">
        {mockBuckets.map((bucket) => (
          <Card 
            key={bucket.id} 
            className="cursor-pointer hover:shadow-md transition-shadow h-fit"
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{bucket.emoji}</div>
                <div className="flex-1">
                  <h3 className="font-medium">{bucket.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {bucket.taskCount} tasks
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Add new bucket card */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow border-dashed h-fit">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Plus className="h-4 w-4" />
              <span className="text-sm">Add Bucket</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}