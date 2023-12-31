"use client"
import React, { ChangeEvent, FunctionComponent, useRef, useState } from 'react'
import { useField } from 'formik'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Switch } from '@headlessui/react'

interface Props{
    name: string
    label: string
	placeholder: string
	fieldType?: 'text' | 'image' | 'switch'
	defaultImageUrl?: string
}
const FormikField: FunctionComponent<Props> = ( props ) => {

	const { name, label, placeholder, fieldType='text', defaultImageUrl } = props

	const [field, meta, helpers] = useField( name )

	// handle image
	const [imageUrl, setImageUrl] = useState<string>( defaultImageUrl || '' );
	const imageField = useRef<HTMLInputElement>( null )

	const handleImage = ( e: ChangeEvent<HTMLInputElement> )=>{
		if( !e?.target?.files ) return
		setImageUrl( URL.createObjectURL( e.target.files[0] ) )
	}

	const clearImage= ()=>{
		setImageUrl( '' )
		if( !imageField.current?.value ) return
		imageField.current.value= ''
	}
	
	return (
		<div className='flex flex-col gap-2'>
			<label htmlFor={name}>{label}</label>
			{ fieldType === 'text' ?
				<input id={name} type="text"
					placeholder={placeholder} {...field}
					className={`text-white p-2 border rounded-lg bg-transparent ring-0 focus:ring-0 shadow-none focus:outline-none  transition-default ${meta.touched && meta.error ? 'focus:border-red-500 border-red-500 ':'focus:border-white/50 border-white/25 '}`}
				/> 
				: fieldType === 'image' ?
					<>
						<input 
							id={name} 
							ref={imageField}
							type="file"
							placeholder={placeholder} 
							{...field}
							className="hidden"
							onChange={handleImage}

						/> 
						{
							imageUrl ? 
								<div className=' aspect-square w-60 relative' >
									<div className='absolute z-20 right-4 top-4'>
										<button type='button' className='text-dark w-6 aspect-square border border-none bg-dark-secondary rounded-full'
											onClick={()=> clearImage()}
										><FontAwesomeIcon icon={faXmark}/></button>
									</div>
									<Image src={imageUrl as string} alt='Preview image'
										fill
										style={{
											objectFit : 'contain'
										}}
										className='z-0'
									/>
								</div>
								:
								<button type='button' className='bg-dark-secondary aspect-square w-60 border border-dashed border-white/25'
									onClick={()=> imageField.current?.click()}
								>
									Select Image
								</button>

						}
				
					</>
					: fieldType === 'switch' ?
						<>
							<Switch
								name={field.name}
								checked={field.value}
								onChange={()=> {
									helpers.setValue( !field.value )
									helpers.setTouched( true )
								}}
								value={field.value}
								className={`${
									field.value ? 'bg-orange' : 'bg-dark-secondary'
								} relative inline-flex h-6 w-11 items-center rounded-full border border-transparent transition-default bg-dark hover:border-white/25`}
							>
								<span className="sr-only">Enable notifications</span>
								<span
									className={`${
										field.value ? 'translate-x-6' : 'translate-x-1'
									} inline-block h-4 w-4 transform rounded-full bg-white transition`}
								/>
				 		 </Switch>
						</>
				  : ''
			}
			<p className={`text-[0.7rem] text-red-500 transition-default delay-100 ${meta.error && meta.touched ? 'translate-y-0 opacity-100': '-translate-y-2 opacity-0'}`}>{meta.error}</p>
		</div>
	)
}

export default FormikField
