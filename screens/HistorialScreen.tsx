import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '../firebase/Config2';

export default function HistorialScreen() {
  const [datos, setdatos] = useState([]);
  
  async function leer() {
    const { data, error } = await supabase.from('Historial').select();
    setdatos(data as any);
  }
  
  useEffect(() => {
    leer();
  }, []);
  
  type Historia = {
    id: number,
    Pedido: string;
    Marca: string;
    Cantidad: number;
    Total: number;
  };

  const formatTotal = (total: number) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(total);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>📋 Historial de Pedidos</Text>
        <Text style={styles.subtitulo}>
          {datos.length} {datos.length === 1 ? 'pedido registrado' : 'pedidos registrados'}
        </Text>
        <View style={styles.headerDivider} />
      </View>

      {datos.length > 0 ? (
        <FlatList
          data={datos}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }: { item: Historia; index: number }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.pedidoContainer}>
                  <Text style={styles.pedidoLabel}>PEDIDO</Text>
                  <Text style={styles.pedidoId}>#{item.id.toString().padStart(4, '0')}</Text>
                </View>
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Completado</Text>
                </View>
              </View>

              <View style={styles.cardContent}>
                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>🏷️ Marca</Text>
                    <Text style={styles.infoValue}>{item.Marca}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>📦 Cantidad</Text>
                    <Text style={styles.infoValue}>{item.Cantidad} {item.Cantidad === 1 ? 'unidad' : 'unidades'}</Text>
                  </View>
                </View>

                <View style={styles.totalContainer}>
                  <Text style={styles.totalLabel}>Total pagado</Text>
                  <Text style={styles.totalValue}>{formatTotal(item.Total)}</Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.orderNumber}>Orden #{index + 1}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📋</Text>
          <Text style={styles.emptyTitle}>Sin historial</Text>
          <Text style={styles.emptySubtitle}>No hay pedidos registrados aún</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  header: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 16,
    color: '#10B981',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },
  headerDivider: {
    width: 40,
    height: 3,
    backgroundColor: '#10B981',
    alignSelf: 'center',
    borderRadius: 2,
  },
  listContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0F0F0F',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  pedidoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pedidoLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  pedidoId: {
    fontSize: 18,
    color: '#10B981',
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#064E3B',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  statusText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  cardContent: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  infoItem: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#10B981',
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  totalContainer: {
    backgroundColor: '#064E3B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  totalLabel: {
    fontSize: 14,
    color: '#6EE7B7',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  totalValue: {
    fontSize: 24,
    color: '#10B981',
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  cardFooter: {
    padding: 12,
    backgroundColor: '#0F0F0F',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    alignItems: 'center',
  },
  orderNumber: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    fontStyle: 'italic',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});