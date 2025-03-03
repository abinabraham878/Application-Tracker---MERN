import { ReactNode } from 'react';

interface TextLinkProps {
  href: string;
  children: ReactNode;
}

const TextLink = ({ href, children }: TextLinkProps) => {
    return (
      <a href={href} className="font-medium text-blue-600 hover:text-blue-500">
        {children}
      </a>
    );
  };

export default TextLink;