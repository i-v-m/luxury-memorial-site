import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CatalogPaginationProps {
  currentPage: number;
  showLoadMore: boolean;
  onPageChange: (page: number) => void;
  onLoadMore: () => void;
}

export default function CatalogPagination({
  currentPage,
  showLoadMore,
  onPageChange,
  onLoadMore
}: CatalogPaginationProps) {
  return (
    <div className="px-4 pb-16">
      <div className="container mx-auto">
        {/* Load more button */}
        {showLoadMore && (
          <div className="mb-6">
            <Button 
              size="lg"
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90"
              onClick={onLoadMore}
            >
              <Icon name="Plus" size={16} />
              Показать ещё
            </Button>
          </div>
        )}

        {/* Pagination */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
              <span className="text-xs sm:text-sm text-muted-foreground mr-1 sm:mr-2 w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0">Страница:</span>
              {[...Array(10)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    className={`w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm ${
                      currentPage === pageNum 
                        ? "bg-primary text-white" 
                        : "hover:bg-muted"
                    }`}
                    onClick={() => onPageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}