export default function NeubrutalismButton({ btnName, ...rest }) {
  return (
    <button
      {...rest}
      className={'group/button rounded-lg bg-foreground text-background'}
    >
      <span
        className={
          'block -translate-x-1 -translate-y-1 rounded-lg border-2 border-foreground bg-secondary px-4 py-1 text-lg font-medium tracking-tight transition-all group-hover/button:-translate-y-2 group-active/button:translate-x-0 group-active/button:translate-y-0'
        }
      >
        {btnName}
      </span>
    </button>
  );
}
