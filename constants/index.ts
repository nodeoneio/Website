import {
    telegram,
    x,
    github,
    medium,
    youtube,
    eosverse,
} from '@/public/assets/icons';
import { eoslogo, fiologo, xprlogo, librelogo } from '@/public/assets/images';

export const topNavLinks = [
    {
        imgURL: '/assets/icons/home.svg',
        route: '/',
        label: 'About',
    },
    {
        imgURL: '/assets/icons/blockchain.svg',
        route: '/blockexplorer/eos',
        label: 'Block Explorer',
        badge: 'ALPHA',
    },
    {
        imgURL: '/assets/icons/community.svg',
        route: '/community',
        label: 'Community',
        badge: 'TBD',
    },
    {
        imgURL: eosverse,
        route: 'https://eosverse.io',
        label: 'EOSVerse',
    },
];

export const sidebarLinks = [
    {
        imgURL: '/assets/icons/create.svg',
        route: '/create-thread',
        label: 'Create Thread',
    },
    {
        imgURL: '/assets/icons/search.svg',
        route: '/search',
        label: 'Search',
    },
    {
        imgURL: '/assets/icons/heart.svg',
        route: '/activity',
        label: 'Recent Activity',
    },
];

export const profileTabs = [
    { value: 'threads', label: 'Threads', icon: '/assets/icons/reply.svg' },
    { value: 'replies', label: 'Replies', icon: '/assets/icons/members.svg' },
    { value: 'tagged', label: 'Tagged', icon: '/assets/icons/tag.svg' },
];

export const communityTabs = [
    { value: 'threads', label: 'Threads', icon: '/assets/icons/reply.svg' },
    { value: 'members', label: 'Members', icon: '/assets/icons/members.svg' },
    { value: 'requests', label: 'Requests', icon: '/assets/icons/request.svg' },
];

export const footerLinks = [
    {
        title: 'Useful Links',
        links: [
            {
                name: 'NodeONE Developers Document',
                link: 'https://devdocs.nodeone.network',
            },
            { name: 'EOS Network Foundation', link: 'https://eosnetwork.com/' },
            { name: 'Antelope Protocol', link: 'https://antelope.io/' },
            { name: 'XPR Network', link: 'https://xprnetwork.org' },
            { name: 'Libre', link: 'https://www.libre.org' },
            { name: 'FIO', link: 'https://fio.net' },
        ],
    },
    {
        title: 'Help',
        links: [
            { name: 'About us', link: '/' },
            { name: 'FAQs', link: '/' },
            { name: 'How it works', link: '/' },
            { name: 'Privacy policy', link: '/' },
            { name: 'Payment policy', link: '/' },
            { name: 'Terms and Conditions', link: '/' },
        ],
    },
    {
        title: 'Get in touch',
        links: [
            { name: 'info@nodeone.io', link: 'mailto:info@nodeone.io' },
            {
                name: 'NodeONE(EOSVerse) Telegram',
                link: 'https://t.me/eosverse',
            },
        ],
    },
];

export const socialMedia = [
    { icon: telegram, alt: 'Telegram logo', src: 'https://t.me/eosverse' },
    { icon: x, alt: 'X(Twitter) logo', src: 'https://twitter.com/nodeoneio' },
    { icon: medium, alt: 'Medium logo', src: 'https://medium.com/eos-nodeone' },
    { icon: github, alt: 'Github logo', src: 'https://github.com/Nodeoneio' },
    {
        icon: youtube,
        alt: 'Youtube logo',
        src: 'https://www.youtube.com/@eosnodeone7165',
    },
];

export const chains = [
    {
        img: eoslogo,
        title: 'EOS',
        description: 'EOS is a Blockchain network that ...',
        link: 'https://eosnetwork.com/',
    },
    {
        img: xprlogo,
        title: 'XPR Network',
        description: 'XPR Network is a Blockchain network that ...',
        link: 'https://xprnetwork.org',
    },
    {
        img: librelogo,
        title: 'Libre',
        description: 'Libre is a Blockchain network that ...',
        link: 'https://www.libre.org',
    },
    {
        img: fiologo,
        title: 'FIO',
        description: 'FIO is a Blockchain network that ...',
        link: 'https://fio.net',
    },
];
