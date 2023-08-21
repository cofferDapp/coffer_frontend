import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi"
import { contractAddress } from "@/constants/contract"
import ABI from "@/constants/ABI/url.json"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"


export default function CreateFolder({uri, close}) {
  const [name, setName] = useState("")

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: ABI,
    functionName: 'CreateFolder',
    args: [ name ],
  })


  const {data:cwriteData, isLoading:cwriteLoading, write:cwriteWrite} = useContractWrite(config)

  const {data, isError, isLoading} = useWaitForTransaction({
    hash: cwriteData?.hash,
    onSuccess(data) {
      // console.log('Success', data)
      toast.success("Folder created succesfully");
      
      close()
    },

  })

  const handlesubmit =(e)=>{
    e.preventDefault()

    cwriteWrite?.()
  }

  useEffect(()=>{
    if(isError){
      toast.error("Error Occur, try again")
    }

  }, [isError])
  return (
    <main>
      <section className="w-[30%] smDesktop:w-[40%] tabletAir:w-[50%] tablet:w-[55%] mobile:w-[75%] mx-auto bg-[white] mt-[200px] z-[80] opacity-[100%] shadow-lg">
        
        <div className="w-[90%] mx-auto flex pt-4 justify-end">
          <img src="/../Icon/close.svg" alt="" className="w-[20px] h-[20px] cursor-pointer" onClick={close}/>
        </div>

      <h2 className="text-[20px] leading-6 text-center text-[#010101] side font-normal pt-6">Create Folder</h2>
      <form>
        <div className="mt-8 w-[90%] mx-auto">
    <h2 className="text-[17px] leading-6 font-medium">Folder Name</h2>

    <input type="text" className="w-[90%] outline-[0.5px] border-[1px] border-[#010101] mt-4 h-[37px] rounded-xl px-2 text-[16px]"  placeholder="Enter Folder Name" onChange={(e)=>setName(e.target.value)} value={name}/>
        </div>
<div className="flex justify-center pb-4">
        <button onClick={handlesubmit} className="text-[16px] text-[#FEFEFE] bg-[#0E1A87] w-[104px] h-[40px] mx-auto rounded-[20px] mt-6">
        {cwriteLoading||isLoading ? "Creating..." :
        
        "Create"
      }
        </button>

</div>
      </form>
      </section>
    </main>
  )
}
