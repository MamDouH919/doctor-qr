import React from "react";
import { Avatar, Icon, Stack, Typography } from "@mui/material";

interface LabelValueProps {
    label: string;
    value: string | React.ReactNode;
    icon?: string;
    stringValue?: boolean;
    direction?: "row" | "column";
    alignItems?: "center" | "flex-start";
}

const LabelValue: React.FC<LabelValueProps> = ({
    label,
    value,
    icon,
    direction = "column",
    alignItems = "flex-start",
    stringValue = true,
}) => {

    return (
        <Stack direction="row" alignItems="center" gap={2}>
            {icon && (
                <Avatar sx={{ width: 30, height: 30, bgcolor: "#fff" }}>
                    <Icon color="primary">{icon}</Icon>
                </Avatar>
            )}
            <Stack direction={direction} alignItems={alignItems} spacing={direction === "row" ? 0.5 : 0}>
                <Typography variant="body2">{label}</Typography>
                {stringValue ? (
                    <Typography pl={0.5} color="text.secondary" fontSize={12}>
                        {value || "__"}
                    </Typography>
                ) : (
                    value
                )}
            </Stack>
        </Stack>
    );
};

export default LabelValue;
