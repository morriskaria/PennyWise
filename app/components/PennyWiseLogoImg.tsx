// PennyWise logo as an image component
import Image from 'next/image';

export default function PennyWiseLogoImg({ className = "", ...props }) {
  return (
    <Image
      src="/pennywise-logo.png"
      alt="PennyWise Logo"
      width={160}
      height={48}
      className={className}
      priority
      {...props}
    />
  );
}
