
import { Sidebar } from "@/components/layouts/Sidebar";

export function RecipeDetailSkeleton() {
  return (
    <div className="flex min-h-screen bg-slate">
      <Sidebar />
      <div className="flex-1">
        <div className="md:ml-64 min-h-screen">
          <main className="p-4 pb-24 space-y-6 max-w-2xl mx-auto">
            <div className="animate-pulse mt-16 md:mt-0">
              <div className="h-8 bg-cream/10 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-cream/10 rounded w-1/4 mb-8"></div>
              <div className="space-y-4">
                <div className="h-64 bg-cream/10 rounded"></div>
                <div className="h-32 bg-cream/10 rounded"></div>
                <div className="h-48 bg-cream/10 rounded"></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
