import { ReactNode } from 'react';

interface TextLinkProps {
  href?: string;
  onClick: () => void;
  children: ReactNode;
}

const TextLink = ({ href, onClick, children }: TextLinkProps) => {
    return (
      <a href={href} onClick={onClick} className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
        {children}
      </a>
    );
  };

export default TextLink;