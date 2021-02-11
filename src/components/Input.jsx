export default function Input(props) {
  const className = `w-full h-16 px-3 rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg ${props.className}`;
  return (
    <input
      className={className}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(event) => props.onChange(event.target.value)}
    ></input>
  );
}
