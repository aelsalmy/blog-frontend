import { Button, Stack, type SxProps } from "@mui/material"
import { Text2Comp } from "../text/text2.styled"
import { Formik } from "formik"
import { toFormikValidate } from "../../../utils/zodFormikAdapter"
import { z } from "zod"
import { Text4CompError } from "../text/text4.styled"
import CustomFormField from "./CustomFormField"

interface FormProps {
    title?: string
    fields: FormFieldProps[]
    buttons?: ButtonProps[]
    submitButtonText?: string
    schema: z.ZodType
    error?: string
    initialValues: Record<string, any>
    onSubmit?: (data: any) => void | Promise<void>
    showSubmit?: boolean
    id?: string
}

interface ButtonProps {
    text: string
    variant: "contained" | "text" | "outlined"
    color?: "primary" | "secondary"
    size?: "small" | "medium" | "large"
    sx?: SxProps
    onClick: () => void | Promise<void>
}

interface FormFieldProps {
    label: string
    type: string
    key: string
    value?: string
}

export function CustomForm({
    title, 
    fields, 
    buttons,
    schema,
    initialValues,
    error,
    onSubmit = () => {},
    submitButtonText = "Submit",
    showSubmit = true,
    id
}: FormProps) {

    return (
        <>  
            <Formik
                initialValues={initialValues}
                validate={toFormikValidate(schema)}
                onSubmit={onSubmit}
            > 
                {({handleSubmit , isSubmitting}) => (
                    <form id={id} onSubmit={handleSubmit}>
                        <Stack>
                            <Text2Comp>{title}</Text2Comp>
                            {fields.map(field => (
                                <CustomFormField 
                                    key={field.key}
                                    label={field.label}
                                    type={field.type}
                                    name={field.key}
                                    value={field.value}
                                />
                            ))}
                            {error && <Text4CompError>{error}</Text4CompError>}
                            {showSubmit &&
                                <Button 
                                    type="submit" 
                                    disabled={isSubmitting} 
                                    variant="contained"
                                    sx={{mt: 2}}
                                    onClick={() => handleSubmit()}
                                >
                                    {submitButtonText}
                                </Button>
                            }
                            {buttons && buttons.map(button => (
                                <Button 
                                    type="submit" 
                                    disabled={isSubmitting} 
                                    variant={button.variant}
                                    color={button.color}
                                    size={button.size}
                                    sx={{mt: 2}}
                                    onClick={() => button.onClick()}
                                >
                                    {button.text}
                                </Button>
                            ))}
                        </Stack>
                    </form>
                )}
            </Formik>
        </>
    )
}