import CustomLoading from './../components/loading';

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <div><CustomLoading dimention={'40px'} /></div>
    </div>
  )
}