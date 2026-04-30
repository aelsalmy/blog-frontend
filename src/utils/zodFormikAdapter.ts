import { z } from "zod"

export const toFormikValidate  = (schema: z.ZodType) => 
    async (values: any) => {
    
    const result = schema.safeParse(values)

    if(result.success){
        return {}
    }
    else{
        const errors: Record<string, string> = {}

        for (const issue of result.error.issues){
            const path = issue.path.join(".")
            if(!errors[path]){
                errors[path] = issue.message
            }
        }

        return errors
    }
}