import { Alert, Button, CardActions, CardContent, Grid, Snackbar, Stack, styled } from "@mui/material";
import CustomFormField from "./common/forms/CustomFormField";
import { StyledCard } from "./post";
import { useState } from "react";
import { toFormikValidate } from "../utils/zodFormikAdapter";
import { Formik } from "formik";
import type z from "zod";

export const ItemWrapper = styled("div")({
    display: "flex",
    alignItems: "baseline",
    "& .MuiTextField-root": {
        marginLeft: "8px",
    },
    "& .MuiInputBase-root": {
        height: "30px",
    },
    "& > span:first-of-type, & > label:first-of-type": {
        minWidth: "100px",
    }
})

export const LeftAlignActions = styled(CardActions)({
    display: "flex",
    justifyContent: "right",
})

export interface UserProfile {
    profession: string
    city: string
    country: string
}

interface EditProfileFormProps {
    onEdit: (values: any) => void
    initialValues: UserProfile
    schema: z.ZodType
}

export function EditProfileForm({
    onEdit,
    initialValues,
    schema
} : EditProfileFormProps){
    const [editing, setEditing] = useState(false);
    const [editSuccessOpen , setEditSuccessOpen] = useState(false)

    const submitHelper = async (values: any) => {
        await onEdit(values);
        setEditing(false);
        setEditSuccessOpen(true);
    }

    return (
        <Formik
            initialValues={initialValues}
            validate={toFormikValidate(schema)}
            onSubmit={submitHelper}
            enableReinitialize
        >
            {({handleSubmit, isSubmitting , resetForm}) =>
                <form onSubmit={handleSubmit}>
                    <StyledCard>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <Stack>
                                        <ItemWrapper>
                                            <span>City:</span>
                                            <CustomFormField
                                                type="text"
                                                name="city"
                                                disabled={!editing}
                                            />
                                        </ItemWrapper>
                                        <ItemWrapper>
                                            <span>Country:</span>
                                            <CustomFormField
                                                type="text"
                                                name="country"
                                                disabled={!editing}
                                            />
                                        </ItemWrapper>
                                    </Stack>
                                </Grid>
                                <Grid size={6}>
                                    <ItemWrapper>
                                        <span>Profession:</span>
                                        <CustomFormField
                                            type="text"
                                            name="profession"
                                            disabled={!editing}
                                        />
                                    </ItemWrapper>
                                </Grid>
                            </Grid>
                        </CardContent>

                        <Snackbar
                            open={editSuccessOpen}
                            autoHideDuration={3000}
                            onClose={() => setEditSuccessOpen(false)}
                        >
                            <Alert severity="success" variant="filled">
                                Profile updated successfully
                            </Alert>
                        </Snackbar>

                        <LeftAlignActions>
                            {editing ?
                                <ItemWrapper>
                                    <Button onClick={() => {setEditing(false); resetForm()}}>
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        variant="contained"
                                        sx={{mt: 2 , ml: "8px"}}
                                    >
                                        Save Profile
                                    </Button>
                                </ItemWrapper>

                            :
                                <Button onClick={() => setEditing(true)}>
                                    Edit Profile
                                </Button>
                            }
                        </LeftAlignActions>
                    </StyledCard>
                </form>
            }
        </Formik>
    )
}