import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { db } from '../firebase/Config';

type Repuesto = {
    id: string;
    creadoPor: string;
    description: string;
    fecha: string;
    imagen: string;
    marca: string;
    marcaRepuesto: string;
};

export default function PerfilScreen() {
    const [email, setEmail] = useState<string>('');
    const [repuestos, setRepuestos] = useState<Repuesto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                console.log('No hay usuario autenticado');
                setLoading(false);
                return;
            }

            const userEmail = user.email || '';
            setEmail(userEmail);

            const username = userEmail.split('@')[0];
            const userId = `userId_${username}`;

            try {

                const repuestosRef = ref(db, `users/${userId}/repuestos`);
                const snapshot = await get(repuestosRef);

                if (snapshot.exists()) {
                    const repuestosData = snapshot.val();
                    const repuestosArray = Object.keys(repuestosData).map(key => ({
                        id: key,
                        ...repuestosData[key]
                    }));
                    setRepuestos(repuestosArray);
                }
            } catch (error) {
                console.error('Error al obtener repuestos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#22C55E" />
                <Text style={styles.loadingText}>Cargando perfil...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mi Perfil</Text>
                <View style={styles.headerDivider} />
            </View>

            <View style={styles.profileCard}>
                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>{email.charAt(0).toUpperCase()}</Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.value}>{email}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.subtitle}>Mis Repuestos</Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{repuestos.length}</Text>
                </View>
            </View>

            {repuestos.length > 0 ? (
                <FlatList
                    data={repuestos}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({ item }) => (
                        <View style={styles.repuestoCard}>
                            <View style={styles.repuestoHeader}>
                                <Text style={styles.repuestoMarca}>{item.marcaRepuesto}</Text>
                                <Text style={styles.repuestoModelo}>{item.marca}</Text>
                            </View>
                            <Text style={styles.repuestoDesc}>{item.description}</Text>
                            <View style={styles.repuestoFooter}>
                                <Text style={styles.repuestoFecha}>
                                    {new Date(item.fecha).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </Text>
                            </View>
                        </View>
                    )}
                />
            ) : (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyIcon}>📦</Text>
                    <Text style={styles.emptyTitle}>No hay repuestos</Text>
                    <Text style={styles.emptySubtitle}>Aún no tienes repuestos registrados</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0F172A',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#94A3B8', 
        fontWeight: '500',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
        backgroundColor: '#1E293B', 
        borderBottomWidth: 2,
        borderBottomColor: '#22C55E', 
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#F8FAFC', 
        textAlign: 'center',
    },
    headerDivider: {
        width: 60,
        height: 4,
        backgroundColor: '#22C55E', 
        alignSelf: 'center',
        marginTop: 8,
        borderRadius: 2,
    },
    profileCard: {
        backgroundColor: '#1E293B', 
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#374151', 
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#22C55E', 
        alignItems: 'center',
        marginRight: 16,
        borderWidth: 2,
        borderColor: '#16A34A', 
    },
    avatarText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000000',
    },
    profileInfo: {
        flex: 1,
    },
    label: {
        fontSize: 12,
        color: '#94A3B8', 
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    value: {
        fontSize: 18,
        color: '#F8FAFC', 
        fontWeight: '600',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 32,
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#22C55E', 
    },
    badge: {
        backgroundColor: '#22C55E', 
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        minWidth: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#16A34A', 
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#000000', 
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    repuestoCard: {
        backgroundColor: '#1E293B', 
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#374151', 
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: '#22C55E', 
    },
    repuestoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    repuestoMarca: {
        fontSize: 16,
        fontWeight: '700',
        color: '#F8FAFC', 
        flex: 1,
    },
    repuestoModelo: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000000', 
        backgroundColor: '#22C55E',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    repuestoDesc: {
        fontSize: 14,
        color: '#E2E8F0',
        lineHeight: 20,
        marginBottom: 12,
    },
    repuestoFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    repuestoFecha: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '500',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 60,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#F8FAFC', 
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#94A3B8', 
        textAlign: 'center',
        lineHeight: 20,
    },
});