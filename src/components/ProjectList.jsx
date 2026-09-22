import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_DATA } from '../data/projectsData';

export default function ProjectList() {
  const { projects } = SITE_DATA;

  return (
    <div className="project-index">
      {projects.map((item) => (
        <Link 
          key={item.id} 
          to={`/${item.id}`} 
          className="project-row"
        >
          <span className="project-category">{item.category}</span>
          
          <div className="project-title">
            <span>{item.title}</span>
            {item.tag && <span className="tag-badge">{item.tag}</span>}
          </div>

          <span className="project-year">{item.year}</span>
        </Link>
      ))}
    </div>
  );
}
