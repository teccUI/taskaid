import Header from '@/components/layout/Header';
import TaskList from '@/components/TaskList';
import BucketGrid from '@/components/BucketGrid';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, FileText, Flame } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto p-6">
        {/* Two-pane layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
          {/* Left pane - Task List */}
          <div className="min-h-0">
            <TaskList />
          </div>
          
          {/* Right pane - Bucket Grid */}
          <div className="min-h-0">
            <BucketGrid />
          </div>
        </div>
        
        {/* Analytics Bar */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span>2 done today</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <FileText className="h-4 w-4" />
                <span>5 open</span>
              </div>
              <div className="flex items-center gap-2 text-orange-600">
                <Flame className="h-4 w-4" />
                <span>4-day streak</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}