"use client"
import React from 'react'
import { styled } from '@mui/material/styles';
import { Avatar, Stack } from '@mui/material';
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaSnapchatGhost, FaTiktok, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { FaXTwitter } from 'react-icons/fa6';
import { HiUserGroup } from 'react-icons/hi';
import { FcShare } from 'react-icons/fc';
import { GiWorld } from 'react-icons/gi';
import Link from 'next/link';

const Icons = {
    facebook: {
        comp: <FaFacebookF color='#1877F2' size={20} />,
        color: '#1877F2',
    },
    instagram: {
        comp: <FaInstagram color='#DD2A7B' size={20} />,
        color: '#DD2A7B',
    },
    tikTok: {
        comp: <FaTiktok color='#000' size={20} />,
        color: '#000',
    },
    twitter: {
        comp: <FaXTwitter color='#000' size={20} />,
        color: '#000',
    },
    snapChat: {
        comp: <FaSnapchatGhost color='#FFFC00' size={20} />,
        color: '#FFFC00',
    },
    phone: {
        comp: <FaPhoneAlt color='green' size={20} />,
        color: 'green',
    },
    location: {
        comp: <IoLocationSharp color='#EA4335' size={30} />,
        color: '#EA4335',
    },
    whatsApp: {
        comp: <FaWhatsapp color='#25D366' size={25} />,
        color: '#25D366',
    },
    youtube: {
        comp: <FaYoutube color='#FF0000' size={30} />,
        color: '#FF0000',
    },
    group: {
        comp: <HiUserGroup color='#1877F2' size={30} />,
        color: '#1877F2',
    },
    Share: {
        comp: <FcShare size={30} />,
        color: '#FFFC00',
    },
    website: {
        comp: <GiWorld color='grey' size={30} />,
        color: 'grey',
    }
}

interface AvatarStyleProps {
    borderColor: string;
}

const AvatarStyle = styled(Avatar, {
    shouldForwardProp: (prop) => prop !== 'borderColor', // Prevents `borderColor` from being passed to the DOM
})<AvatarStyleProps>(({ borderColor }) => ({
    border: `2px solid ${borderColor}`,
    backgroundColor: 'transparent',
    transition: 'background-color 0.3s ease, border-color 0.3s ease, fill 0.3s ease',
    "&:hover": {
        backgroundColor: borderColor,
        "& svg": {
            fill: 'white',
        },
    },
}));

interface SocialProps {
    type: string,
    link: string,
}

const Social = ({
    social
}: {
    social: SocialProps[] | undefined
}) => {
    if (!social) {
        return <></>
    }

    return (
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
            {social && social.map(({ type, link }) =>
                <Link href={link} key={type} target='_blank' >
                    <AvatarStyle borderColor={Icons[type as keyof typeof Icons].color}>
                        {Icons[type as keyof typeof Icons].comp}
                    </AvatarStyle>
                </Link>
            )}
        </Stack>
    )
}

export default Social