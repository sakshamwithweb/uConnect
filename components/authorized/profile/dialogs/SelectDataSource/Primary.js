import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"


export const Primary = ({ consentCheck, setConsentCheck, consentRef, consentTextRef, allDataSources }) => {
  return <>
    <div className='flex items-center gap-2' onClick={() => setConsentCheck(!consentCheck)}>
      <Checkbox ref={consentRef} className="border-2 cursor-pointer" checked={consentCheck} onCheckedChange={(e) => setConsentCheck(e)} />
      <div ref={consentTextRef} className={"flex items-center cursor-pointer select-none"}>
        I&apos;m aware and allow Uconnect to access my public data.
      </div>
    </div>
    <div className='social-media'>
      <h3 className='font-semibold text-xl'>Social Media</h3>
      <div className='grid grid-cols-4 gap-4 py-4'>
        {allDataSources.map((dataSource, idx) => {
          const Icon = dataSource["icon"]
          return <Button key={idx} {...(dataSource.action && { onClick: dataSource.action })} variant={"outline"} className='border flex rounded-2xl justify-around items-center p-2'>
            <Icon size={dataSource["size"]} />
            <span className='font-bold'>{dataSource["name"]}</span>
          </Button>
        })}
      </div>
    </div>
  </>
}