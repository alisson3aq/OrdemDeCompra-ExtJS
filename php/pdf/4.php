<?php

require_once('../tcpdf/config/lang/eng.php');
require_once('../tcpdf/tcpdf.php');
require_once("../conectar.php");

$nOrdem = $_GET['nOrdem'];

// extend TCPF with custom functions
class MYPDF extends TCPDF {

	// Load table data from file
	public function LoadData($file) {
		// Read file lines
		$lines = file($file);
		$data = array();
		foreach($lines as $line) {
			$data[] = explode(';', chop($line));
		}
		return $data;
	}

	// Colored table
	public function ColoredTable($header,$data) {
		// Colors, line width and bold font
		$this->SetFillColor(180);
		$this->SetTextColor(0);
		$this->SetDrawColor(210, 210, 210);
		$this->SetLineWidth(0.3);
		$this->SetFont('', 'B');
		// Header
		$w = array(15, 120, 15, 15, 15);
		$num_headers = count($header);
		for($i = 0; $i < $num_headers; ++$i) {
			$this->Cell($w[$i], 7, $header[$i], 1, 0, 'C', 1);
		}
		$this->Ln();
		// Color and font restoration
		$this->SetFillColor(240, 240, 240);
		$this->SetTextColor(0);
		$this->SetFont('');
		// Data
		$fill = 0;
		foreach($data as $row) {
			$this->Cell($w[0], 6, $row['id'], 'LR', 0, 'C', $fill);
			$this->Cell($w[1], 6, $row['nome_mat'], 'LR', 0, 'L', $fill);
			$this->Cell($w[2], 6, $row['un_codi'], 'LR', 0, 'C', $fill);
			$this->Cell($w[3], 6, $row['preco_unit_part'], 'LR', 0, 'C', $fill);
			$this->Cell($w[4], 6, $row['qtde_comprar'], 'LR', 0, 'C', $fill);
			$this->Ln();
			$fill=!$fill;
		}
		$this->Cell(array_sum($w), 0, '', 'T');
	}
}


//load data
$sql = "SELECT itens_ordem.id, itens_ordem.nome_mat, itens_ordem.un_codi, itens_ordem.preco_unit_part, itens_ordem.qtde_comprar 
FROM itens_ordem, ordem 
WHERE (itens_ordem.id_ordem = ordem.id) and
	  (itens_ordem.id_ordem = '$nOrdem')";

$result = array();
if ($resultdb = $mysqli->query($sql)) {

	while($record = $resultdb->fetch_assoc()) {

		array_push($result, $record);
	}	

	$resultdb->close();
}

    $sqlOrdem = "SELECT ordem.id, ordem.dataPedido, ordem.i_processo, processos.modalidade, 
    processos.sigla_modal, processos.data_homolog, credores.nome AS nomeC, 
    credores.cgc AS cnpjC, credores.endereco AS enderecoC, credores.cidade AS cidadeC, 
    credores.unidade_federacao, entidades.nome, entidades.cnpj, entidades.bairro, entidades.cidade, 
    entidades.estado, entidades.cep, entidades.email 
    FROM ordem, processos, credores, entidades 
    WHERE (ordem.i_processo = processos.i_processo) and 
    (ordem.id = '$nOrdem') and (ordem.ano = processos.i_ano_proc) and
    (ordem.i_credores = credores.i_credores) and 
    (ordem.id_entidade = entidades.id)";

    $queryOrdem = mysql_query($sqlOrdem) or die(mysql_error());

        if ($resultdb = $mysqli->query($sqlOrdem)) {
             while($linha = mysql_fetch_array($queryOrdem)) {
             $numeroOrdem = $linha['id'];	
             $dataPedido = $linha['dataPedido'];
             $processo = $linha['i_processo'];
             $modalidade = $linha['modalidade'];
             $sigla_modal = $linha['sigla_modal'];
             $data_homolog = $linha['data_homolog'];
             $nomeCredor = $linha['nomeC'];
             $cnpjCredor = $linha['cnpjC'];
             $enderecoCredor = $linha['enderecoC'];
             $cidadeCredor = $linha['cidadeC'];
             $estadoCredor = $linha['unidade_federacao'];
             $nomeEntidade = $linha['nome'];
             $cnpjEntidade = $linha['cnpj'];
             $bairroEntidade = $linha['bairro'];
             $cidadeEntidade = $linha['cidade'];
             $estadoEntidade = $linha['estado'];
             $cepEntidade = $linha['cep'];
             $emailEntidade = $linha['email'];
        }
      $resultdb->close();
    }

	$newDate = date("d-m-Y", strtotime($data_homolog));


//--------------------------------

// create new PDF document
$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Nicola Asuni');
$pdf->SetTitle('Municipio de Monte Carlo');
//$pdf->SetSubject('TCPDF Tutorial');
//$pdf->SetKeywords('TCPDF, PDF, example, test, guide');

// set default header data
$pdf->SetHeaderData('montecarlo.png', 17, 'ESTADO DE SANTA CATARINA', '');

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

//set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

//set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

//set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

//set some language-dependent strings
$pdf->setLanguageArray($l);

// ---------------------------------------------------------


// add a page
$pdf->AddPage();

// set color for background
$pdf->SetFillColor(180);
//$pdf->SetTextColor(255);

//Cell($w, $h=0, $txt='', $border=0, $ln=0, $align='', $fill=0, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M')


$txt = <<<EOD
ORDEM DE COMPRA nº $numeroOrdem
EOD;

// set font
$pdf->SetFont('helvetica', 'BI', 14);

// print a block of text using Write()
$pdf->Write($h=0, $txt, $link='', $fill=0, $align='C', $ln=true, $stretch=0, $firstline=false, $firstblock=false, $maxh=0);

$pdf->Ln(4);

$pdf->SetFont('helvetica', '', 10);
$pdf->setCellMargins(0, 0, 2, 0);
$pdf->SetFont('helvetica', '', 8);
$pdf->Cell(30, 0, 'DATA DO PEDIDO', 1, 0, 'C', 1, '', 0);
$pdf->setCellMargins(0, 0, 0, 0);
$pdf->Cell(112, 0, 'NOME/RAZÃO SOCIAL', 1, 0, 'C', 1, '', 0);
$pdf->Cell(36, 0, 'CNPJ', 1, 1, 'C', 1, '', 0);

$pdf->setCellMargins(0, 0, 2, 0);
$pdf->SetFont('helvetica', '', 10);
$pdf->Cell(30, 4, $dataPedido, 1, 0, 'C', 0, '', 0); //data
$pdf->setCellMargins(0, 0, 0, 0);
$pdf->Cell(112, 4, $nomeCredor, 1, 0, 'L', 0, '', 0); //fornecedor
$pdf->Cell(36, 4, $cnpjCredor, 1, 1, 'C', 0, '', 0); //cnpj

$pdf->setCellMargins(0, 2, 2, 0);
$pdf->SetFont('helvetica', '', 8);
$pdf->Cell(30, 0, 'PROCESSO', 1, 0, 'C', 1, '', 0);
$pdf->setCellMargins(0, 0, 0, 0);
$pdf->Cell(148, 4, 'ENDERECO', 1, 1, 'C', 1, '', 0); //endereco
//$pdf->Cell(46, 4, 'BAIRRO', 1, 1, 'C', 1, '', 0); //bairro

$pdf->setCellMargins(0, 2, 2, 2);
$pdf->SetFont('helvetica', '', 10);
$pdf->Cell(30, 4, $processo.'   '.$sigla_modal.' '.$modalidade, 1, 0, 'C', 0, '', 0); //processo
$pdf->setCellMargins(0, 0, 0, 0);
$pdf->Cell(148, 4, $enderecoCredor, 1, 1, 'L', 0, '', 0); //endereco
//$pdf->Cell(46, 4, 'Salto', 1, 1, 'C', 0, '', 0); //bairro

$pdf->setCellMargins(0, 4, 2, 0);
$pdf->SetFont('helvetica', '', 8);
$pdf->Cell(30, 0, 'HOMOLOGACAO', 1, 0, 'C', 1, '', 0);
$pdf->setCellMargins(0, 0, 0, 0);
$pdf->Cell(52, 4, 'CIDADE', 1, 0, 'C', 1, '', 0);
$pdf->Cell(12, 4, 'UF', 1, 0, 'C', 1, '', 0);
//$pdf->Cell(22, 4, 'CEP', 1, 0, 'C', 1, '', 0);
$pdf->Cell(84, 4, 'E-MAIL', 1, 1, 'C', 1, '', 0); 

$pdf->setCellMargins(0, 4, 2, 0);
$pdf->SetFont('helvetica', '', 10);
$pdf->Cell(30, 0, $newDate, 1, 0, 'C', 0, '', 0);
$pdf->setCellMargins(0, 0, 0, 0);
$pdf->Cell(52, 4, $cidadeCredor, 1, 0, 'C', 0, '', 0);
$pdf->Cell(12, 4, 'SC', 1, 0, 'C', 0, '', 0);
//$pdf->Cell(22, 4, '89.031-001', 1, 0, 'C', 0, '', 0);
$pdf->Cell(84, 4, '', 1, 1, 'C', 0, '', 0); 

$pdf->setCellMargins(0, 6, 2, 0);
$pdf->Cell(180, 0, 'DADOS PARA EMISSÃO DA NF-e', 1, 1, 'C', 1, '', 0);
$pdf->Ln(2);
$pdf->setCellMargins(0, 0, 0, 0);
$pdf->SetFont('helvetica', '', 8);
$pdf->Cell(112, 0, 'NOME/RAZÃO SOCIAL', 1, 0, 'C', 1, '', 0);
$pdf->Cell(36, 0, 'CNPJ', 1, 0, 'C', 1, '', 0);
$pdf->Cell(32, 0, 'IE', 1, 1, 'C', 1, '', 0);

$pdf->SetFont('helvetica', '', 10);
$pdf->Cell(112, 0, $nomeEntidade, 1, 0, 'C', 0, '', 0);
$pdf->Cell(36, 0, $cnpjEntidade, 1, 0, 'C', 0, '', 0);
$pdf->Cell(32, 0, 'ISENTA', 1, 1, 'C', 0, '', 0);

$pdf->SetFont('helvetica', '', 8);
$pdf->Cell(20, 0, 'BAIRRO', 1, 0, 'C', 1, '', 0);
$pdf->Cell(35, 0, 'CIDADE', 1, 0, 'C', 1, '', 0);
$pdf->Cell(40, 0, 'ESTADO', 1, 0, 'C', 1, '', 0);
$pdf->Cell(22, 0, 'CEP', 1, 0, 'C', 1, '', 0);
$pdf->Cell(63, 0, 'E-MAIL', 1, 1, 'C', 1, '', 0);

$pdf->SetFont('helvetica', '', 10);
$pdf->Cell(20, 0, $bairroEntidade, 1, 0, 'C', 0, '', 0);
$pdf->Cell(35, 0, $cidadeEntidade, 1, 0, 'C', 0, '', 0);
$pdf->Cell(40, 0, $estadoEntidade, 1, 0, 'C', 0, '', 0);
$pdf->Cell(22, 0, $cepEntidade, 1, 0, 'C', 0, '', 0);
$pdf->Cell(63, 0, $emailEntidade, 1, 1, 'C', 0, '', 0);

$pdf->Ln(5);

//COLUMNS
//$pdf->Cell(0, 0, 'TEST CELL STRETCH: no stretch', 1, 1, 'C', 0, '', 0);

$pdf->SetFont('helvetica', '', 10);
$pdf->setCellMargins(0, 0, 0, 0);

//Column titles
$header = array('ID', 'Material', 'UN', 'Preço', 'Qtde');

// print colored table
$pdf->ColoredTable($header, $result);

$pdf->Ln(80);

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('ordem_$numeroOrdem.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
