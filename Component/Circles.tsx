import { Box, Stack } from '@mui/material'
import { styled } from "@mui/material/styles";

const Circles = ({
    right = "40%",
    bottom = "10px"
}: {
    bottom?: string,
    right?: string,
}) => {
    const BoxStyleTop = styled(Box)(({ theme }) => ({
        position: 'absolute',
        top: "20px",
        right: right,
        width: "30px",
        height: "30px",
        transform: "rotate(45deg)",
        opacity: "45%",
        backgroundColor: theme.palette.primary.main,
    }));

    const BoxStyleBottom = styled(Box)(({ theme }) => ({
        position: 'absolute',
        bottom: bottom,
        left: "20%",
        width: "30px",
        height: "30px",
        transform: "rotate(45deg)",
        opacity: "45%",
        backgroundColor: theme.palette.primary.main,
    }));

    const CircleStyle = styled(Box)(({ theme }) => ({
        position: 'absolute',
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        backgroundColor: theme.palette.divider,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
    }));

    return (
        <Stack position={"absolute"} width={"100%"} height={"100%"} zIndex={10}>
            <BoxStyleTop />
            <BoxStyleBottom />
            {Array.from({ length: 8 }).map((_, i) => (
                <CircleStyle
                    key={i}

                />
            ))}
        </Stack>
    )
}

export default Circles