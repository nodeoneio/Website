'use client';

import * as React from 'react';
// import { useTranslation } from 'react-i18next';
import i18n from '@/locale/i18n';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { emojiFlag } from '@/lib/utils';

export function LanguageSelector() {
    const [currentLanguage, setCurrentLanguage] = React.useState('GB');

    React.useEffect(() => {
        const lang = localStorage.getItem('n1-language');
        if (lang) setCurrentLanguage(lang);
    }, []);

    React.useEffect(() => {
        i18n.changeLanguage(currentLanguage);
        localStorage.setItem('n1-language', currentLanguage);
    }, [currentLanguage]);

    const language: { [key: string]: string } = {
        GB: 'English',
        KR: '한국어',
        JP: '日本語',
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="text-white"
                >
                    {/* <emojiFlag code={currentLanguage} />{' '} */}
                    {emojiFlag(currentLanguage)} {language[currentLanguage]}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 text-white bg-secondary-500">
                {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                    value={currentLanguage}
                    onValueChange={setCurrentLanguage}
                >
                    <DropdownMenuRadioItem
                        value="GB"
                        className="hover:bg-slate-600"
                    >
                        {/* <emojiFlag code="GB" /> {language.GB} */}
                        {emojiFlag("GB")} {language.GB}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                        value="KR"
                        className="hover:bg-slate-600"
                    >
                        {/* <emojiFlag code="KR" /> {language.KR} */}
                        {emojiFlag("KR")} {language.KR}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                        value="JP"
                        className="hover:bg-slate-600"
                    >
                        {/* <emojiFlag code="JP" /> {language.JP} */}
                        {emojiFlag("JP")} {language.JP}
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
