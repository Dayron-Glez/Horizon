import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './form'
import { Input } from './input'
import {Control, FieldPath} from 'react-hook-form'
import { z } from 'zod'
import { authformSchema } from '@/lib/utils'
const formSchema = authformSchema('sign-up')
interface CustomInputInterface {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label:string,
    placeholder:string,
    type:string
}

const CustomInput = ({control,name, label, placeholder, type}: CustomInputInterface) => {
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
        <div className=' form-item'>
            <FormLabel className='form-label'>
                {label}
            </FormLabel>
            <div className=' flex w-full flex-col'>
                <FormControl>
                    <Input 
                        placeholder={placeholder} 
                        className=' input-class'
                        {...field}
                        type={type}
                    />
                </FormControl>
                <FormMessage className='form-message mt-2'/>
            </div>
        </div>
    )}
/>
  )
}

export default CustomInput