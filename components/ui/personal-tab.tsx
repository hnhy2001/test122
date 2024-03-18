'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const PersonalTab = (props: any) => {
  const router = useRouter()
  const [listTabs, setListTabs] = useState([
    {
      name: 'My Account',
      key: 'my-account',
      path: 'my-account',
    },
    {
      name: 'Company Information',
      key: 'company-information',
      path: 'company-information'
    },
    {
      name: 'Plans',
      key: 'plans',
      path: 'plans'
    },
    {
      name: 'Following',
      key: 'following',
      path: 'following'
    },
    {
      name: 'Company Verification',
      key: 'company-verification',
      path: 'company-verification'
    }
  ])
  const [tabActive, setTabActive] = useState('')
  const changeTab = (tab: string) => {
    router.push(tab)
  }
  useEffect(() => {
    const path = window.location.pathname.replace('/', '')
    setTabActive(path)
  }, [router])
  return (
    <>
      <div className="flex gap-[48px]">
        {
          listTabs.map((item: any) => (
            <div key={item.key} className={`text-[20px] leading-[32px] font-bold py-[16px] px-[32px] uppercase cursor-pointer transitions ${tabActive !== item.path ? 'text-[#939AA1]' : 'border-b-[6px] border-primary'}`} onClick={() => changeTab(item.path)}>
              {item.name}
            </div>
          ))
        }
      </div>
    </>
  )
}
export default PersonalTab