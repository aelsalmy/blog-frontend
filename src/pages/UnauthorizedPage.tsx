import { Text2Comp } from "../components/common/text/text2.styled";
import { CenteredWrapper } from "../components/wrappers/CenteredWrapper.styled";

export function UnauthorizedPage() {
    return (
        <>
            <CenteredWrapper>
                <Text2Comp>You are not Authorized to access this page!</Text2Comp>
            </CenteredWrapper>
        </>
    )
}