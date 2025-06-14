import Loading from '../components/common/loading';

export default function LoadingPage() {
  // Or a custom loading skeleton component
  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <Loading dimention={'40px'} />
    </div>
  )
}