import ErrorIcon from "./ErrorIcon"


const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#1b1b1b] text-[#FF0000]">
        <h1 className="text-[3rem]">Invalid IP address or domain!</h1>
        <ErrorIcon />
    </div>
  )
}

export default Error