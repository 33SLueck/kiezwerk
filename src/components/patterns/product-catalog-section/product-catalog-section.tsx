'use client';

import * as React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ProductGrid } from '@/components/ui/product-grid';
import { FadeIn } from '@/components/ui/motion';
import type { ProductCatalogSectionProps } from './product-catalog-section.types';
import { catalogSectionVariants } from './product-catalog-section.styles';

export const ProductCatalogSection: React.FC<ProductCatalogSectionProps> = ({
  title = 'Explore Product Catalog',
  subtitle = 'Find the best software starters, templates, and UI design kits for your next project.',
  products,
  categories = [],
  onAddToCart,
  className,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [sortBy, setSortBy] = React.useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>(
    'featured'
  );

  // Extract unique categories and calculate counts
  const categoryOptions = React.useMemo(() => {
    if (categories.length > 0) return categories;
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return unique.map((cat) => ({ id: cat, name: cat, slug: cat }));
  }, [categories, products]);

  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    products.forEach((p) => {
      const key = p.category.toLowerCase();
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filter & Sort Products
  const filteredProducts = React.useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory === 'all' ||
          product.category.toLowerCase() === selectedCategory.toLowerCase();
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0; // featured
      });
  }, [products, searchQuery, selectedCategory, sortBy]);

  return (
    <section className={cn(catalogSectionVariants(), className)}>
      {/* Header */}
      <FadeIn direction="up" duration={0.5} className="text-center max-w-3xl mx-auto space-y-3">
        <Heading level={2} size="xl" className="tracking-tight text-foreground font-bold">
          {title}
        </Heading>
        {subtitle && (
          <Text as="p" size="md" className="text-muted-foreground">
            {subtitle}
          </Text>
        )}
      </FadeIn>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-4 border-b border-border/60 pb-6">
        {/* Category Pills using Badge & SlidersHorizontal Icon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mr-1 select-none">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            <span>Filter:</span>
          </div>

          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className="cursor-pointer focus:outline-none"
          >
            <Badge
              variant={selectedCategory === 'all' ? 'default' : 'secondary'}
              size="md"
              className="transition-all hover:opacity-80"
            >
              All Products ({categoryCounts.all || 0})
            </Badge>
          </button>

          {categoryOptions.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.slug.toLowerCase();
            const count = categoryCounts[cat.slug.toLowerCase()] || 0;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className="cursor-pointer focus:outline-none whitespace-nowrap"
              >
                <Badge
                  variant={isActive ? 'default' : 'secondary'}
                  size="md"
                  className="transition-all hover:opacity-80"
                >
                  {cat.name} ({count})
                </Badge>
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs h-9"
            />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating')
              }
              className="h-9 rounded-lg border border-border bg-background px-3 py-1 text-xs text-foreground font-medium shadow-xs focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count, Active Filter Badges, & Product Grid */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>
              Showing{' '}
              <strong className="text-foreground font-semibold">{filteredProducts.length}</strong>{' '}
              products
            </span>

            {selectedCategory !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1 text-[10px]">
                Category: {selectedCategory}
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className="hover:text-destructive cursor-pointer ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}

            {searchQuery && (
              <Badge variant="secondary" className="flex items-center gap-1 text-[10px]">
                Search: "{searchQuery}"
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="hover:text-destructive cursor-pointer ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>

          {(searchQuery || selectedCategory !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-primary hover:underline font-medium cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        <ProductGrid products={filteredProducts} onAddToCart={onAddToCart} columns={3} />
      </div>
    </section>
  );
};
