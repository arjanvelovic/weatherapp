interface props {
  numbers: any
}

function MapExample(props:props) {

  const numbers = props.numbers

  return (
    <div>

      {numbers.map((number:any) => (
        <div key={number} className=''>{number}</div>
      ))}

    </div>

  )
}

export default MapExample