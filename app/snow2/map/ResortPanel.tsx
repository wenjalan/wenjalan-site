import { MountainResort } from "@/common/types"

export type ResortPanelProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
  canEdit: boolean
  onEdit: () => void
  onDelete: () => void
  resort: MountainResort
}

export default function ResortPanel({ visible, setVisible, canEdit, onEdit, onDelete, resort }: ResortPanelProps) {
  if (!visible) {
    return null;
  }
  return (
    <div className='absolute top-0 left-0 z-10 h-full w-full flex md:w-1/3 p-4'>
      <div className='bg-neutral-900 bg-opacity-90 rounded-md text-white p-4 w-full'>
        {/* name */}
        <h1 className='text-2xl font-bold'><a href={resort.url} target='_blank'>{resort.name}</a></h1>
        {/* temp debug info displays */}
        {/* id */}
        <p className='text-lg'>id={resort.id}</p>
        {/* pass */}
        <p className='text-lg'>pass={resort.pass}</p>
        {/* location */}
        <p className='text-lg'>lat={resort.location.latitude}, lon={resort.location.longitude}</p>
        {/* weather */}
        <p className='text-lg'>weather={resort.weather ? 'defined' : 'undefined'}</p>
        {/* webcams */}
        <p className='text-lg'>webcams={resort.webcams ? 'defined' : 'undefined'}</p>
        {/* sns */}
        <p className='text-lg'>sns={resort.sns ? 'defined' : 'undefined'}</p>
        {/* edit and close buttons */}
        <div className='flex'>
          {canEdit ? <button onClick={onEdit} className='text-white bg-blue-500 hover:bg-blue-700 rounded-md px-2 py-1'>Edit</button> : undefined}
          {/* delete button */}
          {canEdit ? <button onClick={onDelete} className='text-white bg-red-500 hover:bg-red-700 rounded-md px-2 py-1'>Delete</button> : undefined}
          <button onClick={() => setVisible(false)} className='text-white bg-gray-500 hover:bg-gray-700 rounded-md px-2 py-1'>Close</button>
        </div>
      </div>
    </div>
  );
}