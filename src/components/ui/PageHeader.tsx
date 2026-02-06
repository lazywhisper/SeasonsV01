interface PageHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <h1 className="display-md mb-2">
            {title}
          </h1>
          <p
            className="text-sm md:text-base"
            style={{
              color: 'var(--seasons-text-secondary)',
              lineHeight: '1.6',
            }}
          >
            {description}
          </p>
        </div>
        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
