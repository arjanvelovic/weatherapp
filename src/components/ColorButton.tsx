interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: any
}

function ColorButton(props: ButtonProps) {
  const combinedClassName = `border text-white font-bold hover:bg-gray-50 transition duration-700 rounded ` + props.className

  return (
    <button onClick={ props.onClick } className={combinedClassName}>
    { props.children} {props.type}
    </button>
  )
}

export default ColorButton