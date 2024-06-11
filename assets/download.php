<?php
require_once('fpdf186/fpdf.php');


function getDataFromAPI() {
    
    $url = "https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    
    
    if ($response === false) {
        return false; 
    }
    
    
    $data = json_decode($response, true);
    
    
    if ($data === null) {
        return false; 
    }
    
    return $data;
}


ob_start();


$pdf = new FPDF();


$pdf->SetTitle('Dados das 4 primeiras empreas');
$pdf->SetAuthor('Seu Nome');

$pdf->AddPage();


$data = getDataFromAPI();


if ($data !== false) {
    
    $pdf->SetFont('Arial', 'B', 16);

    
    $pdf->Cell(0, 10, 'Dados do Tesouro Publico do Bitcoin', 0, 1, 'C');

    
    $pdf->SetFont('Arial', '', 12);

   
    if (isset($data['companies']) && is_array($data['companies'])) {
        $companies = array_slice($data['companies'], 0, 4);
        foreach ($companies as $company) {
            $pdf->Cell(0, 10, 'Nome da Empresa: ' . $company['name'], 0, 1);
            $pdf->Cell(0, 10, 'Bitcoin em Tesouro Publico: ' . $company['total_holdings'], 0, 1);
            $pdf->Cell(0, 10, 'Valor em USD: ' . $company['total_current_value_usd'], 0, 1);
            $pdf->Ln(10); 
        }
    } else {
        $pdf->Cell(0, 10, 'Dados das empresas não encontrados.', 0, 1);
    }
} else {
    
    $pdf->SetFont('Arial', 'B', 16);
    $pdf->Cell(0, 10, 'Erro ao obter os dados da API', 0, 1, 'C');
}


ob_end_clean();


$pdf->Output('dados_empresas_btc.pdf', 'D');
?>
