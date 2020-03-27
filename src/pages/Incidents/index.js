import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import { loadIncidents, navigateToDetail } from './functions';

import logoImg from '../../assets/logo.png';

export const Incidents = () => {
    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const incidentData = {
        setIncidents, 
        incidents, 
        setTotal, 
        total, 
        setLoading, 
        loading, 
        setPage, 
        page
    };
    
    useEffect(() => {
        loadIncidents(incidentData);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo! </Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia </Text>

            <FlatList 
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={() => loadIncidents(incidentData)}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}:</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text 
                        style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(incident.value)}
                        </Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={navigateToDetail(navigation, incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"/>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

export default Incidents;