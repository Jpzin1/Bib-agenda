import React from 'react';
import './PageTitle.css';

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="page-title">
      <h1>{title}</h1>
      {subtitle && <div className="subtitle">{subtitle}</div>}
    </div>
  );
};

export default PageTitle;
