import CustomLoading from '../components/common/loading';

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <CustomLoading dimention={'40px'} />
    </div>
  )
}