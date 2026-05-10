import { Avatar , CardContent, CircularProgress, Container, Grid, Stack, styled } from "@mui/material";
import { green } from "@mui/material/colors";
import { StyledCard } from "../components/post";
import { CenteredWrapper, HorizontalCenteredWrapper } from "../components/wrappers/CenteredWrapper.styled";
import { StyledTextField } from "../components/common/forms/CustomFormField";
import { useEffect, useState } from "react";
import { getUserAcc, updateProfile } from "../api/userProfile";
import { EditProfileForm, ItemWrapper } from "../components/EditProfileForm";
import { editProfileSchema } from "../schemas/user.schemas";


const UserAvatar = styled(Avatar)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: green[500],
    height: "100px" , 
    width: "100px" ,
    marginBottom: "16px"
})

interface User {
    username: string
    email: string
    profile: {
        profession: string
        city: string
        country: string
    }
}

export function ProfilePage() {
    const [user , setUser] = useState<User | null>() 

    const getUserData = async () => {
        const resp = await getUserAcc()

        if(resp)
            setUser(resp)
    }

    useEffect(() => {
        getUserData()
    } , [])
    
    const handleEdit = async (values: any) => {
        const userProfile = await updateProfile(values.profession , values.city , values.country)

        setUser((prev) => ({
            ...prev , 
            profile: userProfile
        }))
    }
    
    return (
        <>{user?
                <Grid container spacing={2}>
                    <Grid size={3}>
                        <StyledCard>
                            <CardContent>
                                <Stack>
                                    <HorizontalCenteredWrapper>
                                        <UserAvatar /> 
                                    </HorizontalCenteredWrapper>  
                                    <ItemWrapper>
                                        <span>Username:</span>
                                        <StyledTextField 
                                            variant="outlined"
                                            value={user.username}
                                            disabled
                                        />
                                    </ItemWrapper> 
                                    <ItemWrapper>
                                        <span>Email:</span> 
                                        <StyledTextField 
                                            variant="outlined"
                                            value={user.email}
                                            disabled
                                        />
                                    </ItemWrapper>     
                                </Stack>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                    <Grid size={8}>
                        <EditProfileForm 
                            onEdit={handleEdit}
                            initialValues={user.profile}
                            schema={editProfileSchema}
                        />
                    </Grid>
                </Grid>
            : 
                <CenteredWrapper>
                    <CircularProgress size={32}/>
                </CenteredWrapper>
            }
        </>
    )
}