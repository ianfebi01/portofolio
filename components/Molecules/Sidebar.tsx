'use client'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import ButtonSignOut from '../Atoms/ButtonSignOut'

const Sidebar = () => {
	const pathname = usePathname()
	const router = useRouter()
	
	return (
		<aside
			id="sidebar"
			className="fixed top-0 left-0 z-40 w-64 h-screen py-7 transition-transform sm:translate-x-0 bg-dark-secondary flex flex-col"
			aria-label="Sidebar"
		>
			<div className=" mb-6 pb-6 mx-3 flex items-center gap-4 border-b border-white/25">
				<Image src="/Logo.svg" alt="Logo image" width={40} height={40} />
				<div className="flex gap-2">
					<h1 className="leading-none m-0 text-2xl font-bold">IAN</h1>
					<h1 className="text-orange leading-none m-0 text-2xl font-bold">
            FEBI
					</h1>
				</div>
			</div>
			<div className="grow-[1] px-3 pb-4 overflow-y-auto">
				<ul className="space-y-2">
					<li>
						<button
							type="button"
							className={`transition-all ease-in-out duration-500 w-full flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-dark border ${
								pathname === '/admin'
									? 'bg-dark border-transparent'
									: 'bg-none border-white/25 hover:border-transparent'
							}`}
							disabled={pathname === '/admin'}
							onClick={() => router.push( '/admin' )}
						>
							{/* <Icon :name="menu?.icon" /> */}
							<FontAwesomeIcon icon={faUser} size="xs" />

							<p className="ml-3">Profile</p>
						</button>
					</li>
					<li>
						<button
							type="button"
							className={`transition-all ease-in-out duration-500 w-full flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-dark border ${
								pathname === '/admin/portofolio'
									? 'bg-dark border-transparent cursor-default'
									: 'bg-none border-white/25 hover:border-transparent'
							}`}
							disabled={pathname === '/admin/portofolio'}
							onClick={() => router.push( '/admin/portofolio' )}
						>
							{/* <Icon :name="menu?.icon" /> */}
							<FontAwesomeIcon icon={faUser} size="xs" />

							<p className="ml-3">Portofolio</p>
						</button>
					</li>
				</ul>
			</div>
			<div className="px-3">
				<ButtonSignOut />
			</div>
		</aside>
	)
}

export default Sidebar
