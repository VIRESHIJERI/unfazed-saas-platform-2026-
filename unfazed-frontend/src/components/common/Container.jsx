export default function Container({ children, className = '', as: Component = 'div' }) {
  return (
    <Component className={`mx-auto w-full max-w-[var(--container-wide)] px-5 md:px-8 lg:px-10 ${className}`}>
      {children}
    </Component>
  );
}
