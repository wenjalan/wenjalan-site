import { MountainResort, Webcam } from "@/common/types";
import React, { useState } from "react";
import SnowClient from "../SnowClient";

export type EditResortPanelProps = {
  onClose: (visible: boolean) => void
  resort: MountainResort
}

export default function EditResortPanel({ onClose: onClose, resort }: EditResortPanelProps) {
  const [resortDraft, setResortDraft] = React.useState<MountainResort>(resort);
  const [status, setStatus] = React.useState<string | undefined>(undefined);
  const [webcamModalVisible, setWebcamModalVisible] = React.useState<boolean>(false);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResortDraft({
      ...resortDraft,
      name: e.target.value
    });
  }

  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResortDraft({
      ...resortDraft,
      url: e.target.value
    });
  }

  const onPassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setResortDraft({
      ...resortDraft,
      pass: e.target.value === 'none' ? undefined : e.target.value as 'ikon' | 'epic'
    });
  }

  const onLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResortDraft({
      ...resortDraft,
      location: {
        ...resortDraft.location,
        latitude: parseFloat(e.target.value)
      }
    });
  }

  const onLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResortDraft({
      ...resortDraft,
      location: {
        ...resortDraft.location,
        longitude: parseFloat(e.target.value)
      }
    });
  }

  const onTwitterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResortDraft({
      ...resortDraft,
      sns: {
        ...resortDraft.sns,
        twitter: e.target.value
      }
    });
  }

  const onInstagramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResortDraft({
      ...resortDraft,
      sns: {
        ...resortDraft.sns,
        instagram: e.target.value
      }
    });
  }

  const onOpenWebcamModal = () => {
    setWebcamModalVisible(true);
  }

  const onCloseWebcamModal = () => {
    setWebcamModalVisible(false);
  }

  const onSaveWebcamModal = (webcam: Webcam) => {
    setResortDraft({
      ...resortDraft,
      webcams: [...resortDraft.webcams, webcam]
    })
    setWebcamModalVisible(false);
  }

  const onDeleteWebcam = (index: number) => {
    setResortDraft({
      ...resortDraft,
      webcams: resortDraft.webcams.filter((_, i) => i !== index)
    });
  }

  const onSave = async () => {
    try {
      // todo: maybe hoist this to the parent component
      await SnowClient.updateResort(resort.id, resortDraft)
      setStatus('success')
    } catch (err) {
      // @ts-ignore
      setStatus(err.message)
    }
  }

  // similar to ResortPanel but each text field is editable
  return (
    <>
      {webcamModalVisible ? <AddWebcamModal onClose={onCloseWebcamModal} onSave={onSaveWebcamModal} /> : null}
      <div className='absolute top-0 left-0 z-10 w-1/3 h-full p-4 flex'>
        <div className='bg-neutral-900 bg-opacity-90 rounded-md text-white p-4 w-full'>
          <form className='space-y-4'>
            {/* id, not editable */}
            <label className='font-bold'>ID</label>
            <input type='text' value={resortDraft.id} className='w-full bg-neutral-800 text-white p-2 rounded-md' disabled />
            {/* name */}
            <label className='font-bold'>Name</label>
            <input type='text' value={resortDraft.name} className='w-full bg-neutral-800 text-white p-2 rounded-md' onChange={onNameChange} />
            {/* url */}
            <label className='font-bold'>URL</label>
            <input type='text' value={resortDraft.url} className='w-full bg-neutral-800 text-white p-2 rounded-md' onChange={onUrlChange} />
            {/* pass, dropdown list with "ikon" "epic" or "none" */}
            <label className='font-bold'>Pass</label>
            <select value={resortDraft.pass ? resortDraft.pass : 'none'} className='w-full bg-neutral-800 text-white p-2 rounded-md' onChange={onPassChange}>
              <option value='ikon'>Ikon</option>
              <option value='epic'>Epic</option>
              <option value='none'>None</option>
            </select>
            {/* location */}
            <label className='font-bold'>Location (Lat, Lng)</label>
            <input type='text' value={resortDraft.location.latitude} className='w-full bg-neutral-800 text-white p-2 rounded-md' onChange={onLatitudeChange} />
            <input type='text' value={resortDraft.location.longitude} className='w-full bg-neutral-800 text-white p-2 rounded-md' onChange={onLongitudeChange} />
            {/* webcams */}
            <label className='font-bold'>Webcams ({resortDraft.webcams.length})</label>
            <div className='space-y-2'>
              {resortDraft.webcams.map((webcam, idx) => (
                <div key={idx} className='flex space-x-2'>
                  {
                    webcam.srcIsRedirect ?
                      <input type='text' defaultValue={webcam.src} className='w-full bg-blue-500 text-white p-2 rounded-md' />
                    : <input type='text' defaultValue={webcam.src} className='w-full bg-neutral-800 text-white p-2 rounded-md' />
                  }
                  <button type='button' className='text-white bg-red-500 hover:bg-red-700 rounded-md px-2 py-1' onClick={() => onDeleteWebcam(idx)}>Delete</button>
                </div>
              ))}
              <button type='button' className='text-white bg-green-500 hover:bg-green-700 rounded-md px-2 py-1' onClick={onOpenWebcamModal}>Add Webcam</button>
            </div>
            {/* sns */}
            <label className='font-bold'>Social Media</label>
            <input type='text' value={resortDraft.sns ? resortDraft.sns.twitter : ''} className='w-full bg-neutral-800 text-white p-2 rounded-md' onChange={onTwitterChange} />
            <input type='text' value={resortDraft.sns ? resortDraft.sns.instagram : ''} className='w-full bg-neutral-800 text-white p-2 rounded-md' onChange={onInstagramChange} />
            {/* save and close buttons */}
            <div className='flex'>
              <button type='button' onClick={onSave} className='text-white bg-blue-500 hover:bg-blue-700 rounded-md px-2 py-1'>Save</button>
              <button type='button' onClick={() => onClose(false)} className='text-white bg-gray-500 hover:bg-gray-700 rounded-md px-2 py-1 ml-2'>Close</button>
            </div>
            {/* status */}
            {status ? <div className={status === 'success' ? 'text-green-500' : 'text-red-500'}>{status}</div> : undefined}
          </form>
        </div>
      </div>
    </>
  )
}

type AddWebcamModalProps = {
  onSave: (webcam: Webcam) => void
  onClose: () => void
}

function AddWebcamModal({ onSave, onClose }: AddWebcamModalProps) {
  const [draftWebcam, setDraftWebcam] = useState<Webcam>({
    type: 'video',
    src: '',
    srcIsRedirect: false
  })

  const onSrcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraftWebcam({
      ...draftWebcam,
      src: e.target.value
    })
  }

  const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDraftWebcam({
      ...draftWebcam,
      type: e.target.value as Webcam['type']
    })
  }

  const onSrcIsRedirectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraftWebcam({
      ...draftWebcam,
      srcIsRedirect: e.target.checked
    })
  }

  return (
    // <div className='absolute top-0 left-0 z-10 w-1/3 h-full p-4 flex'>
    // centered modal
    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-1/3 p-4'>
      <div className='bg-neutral-900 bg-opacity-90 rounded-md text-white p-4 w-full'>
        <form className='space-y-4'>
          {/* type */}
          <label className='font-bold'>Type</label>
          <select value={draftWebcam.type} className='w-full bg-neutral-800 text-white p-2 rounded-md' onChange={onTypeChange}>
            <option value='video'>Video</option>
            <option value='image'>Image</option>
          </select>
          {/* src */}
          <label className='font-bold'>Source</label>
          <input type='text' value={draftWebcam.src} className='w-full bg-neutral-800 text-white p-2 rounded-md' onChange={onSrcChange} />
          {/* srcIsRedirect */}
          <label className='font-bold'>Source is Redirect</label>
          <input type='checkbox' checked={draftWebcam.srcIsRedirect} onChange={onSrcIsRedirectChange} />
          {/* save and close buttons */}
          <div className='flex'>
            <button type='button' onClick={() => onSave(draftWebcam)} className='text-white bg-blue-500 hover:bg-blue-700 rounded-md px-2 py-1'>Save</button>
            <button type='button' onClick={onClose} className='text-white bg-gray-500 hover:bg-gray-700 rounded-md px-2 py-1 ml-2'>Close</button>
          </div>
        </form>
      </div>
    </div>
  )
}