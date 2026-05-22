import React from 'react';
import { View, StyleSheet } from 'react-native';
import { darkTheme, Theme } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenLayoutProps = {
    children: React.ReactNode;
};

export default function ScreenLayout({
    children,
}: ScreenLayoutProps) {
    const t: Theme = darkTheme;
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: t.bg }]} >
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
});